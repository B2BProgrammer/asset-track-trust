## usage message
function usage() {
	echo "Usage: "
	echo "  bootstrap.sh [-m start|stop|restart] [-t <release-tag>] [-l capture-logs]"
	echo "  bootstrap.sh -h|--help (print this message)"
	echo "      -m <mode> - one of 'start', 'stop', 'restart' " #or 'generate'"
	echo "      - 'start' - bring up the network with docker-compose up & start the app on port 4000"
	echo "      - 'up'    - same as start"
	echo "      - 'stop'  - stop the network with docker-compose down & clear containers , crypto keys etc.,"
	echo "      - 'down'  - same as stop"
	echo "      - 'restart' -  restarts the network and start the app on port 4000 (Typically stop + start)"
	echo "     -a ALL IN ONE 1) Launch network 2) perform admin actions & 3) Start the app "
	echo "     -r re-Generate the certs and channel Artifacts, (** Not Recommended)"
	echo "     -l capture docker logs before network teardown"
	echo
	echo "Some possible options:"
	echo
	echo "	bootstrap.sh"
	echo "	bootstrap.sh -l"
	echo "	bootstrap.sh -r"
	echo "	bootstrap.sh -m stop"
	echo "	bootstrap.sh -m stop -l"
	echo
	echo "All defaults:"
	echo "	bootstrap.sh"
	echo "	Restarts the network and uses latest docker images instead of specific TAG "
	exit 1
}

echo " _                           _        _   _      _                      _"
echo "| |    __ _ _   _ _ __   ___| |__    | \ | | ___| |___      _____  _ __| | __"
echo "| |   / _\` | | | | '_ \ / __| '_ \   |  \| |/ _ \ __\ \ /\ / / _ \| '__| |/ /"
echo "| |__| (_| | |_| | | | | (__| | | |  | |\  |  __/ |_ \ V  V / (_) | |  |   <"
echo "|_____\__,_|\__,_|_| |_|\___|_| |_|  |_| \_|\___|\__| \_/\_/ \___/|_|  |_|\_\\"
echo ""



: ${IMAGE_TAG:="latest"}


## Delete all the Docker Images
function delDckrImages(){
	printf "\n ===========DELETING All the Docker Images======================\n"	
	docker rmi -f $(docker images -q)
}

## Pull all the required Docker Images
function pullAllRequiredDckrImages(){		
	delDckrImages
	printf "\n================All required Docker Images are not available, Starting pull of all required Images======\n"
		
	##for IMAGE in peer orderer ca ccenv javaenv tools couchdb kafka zookeeper; 
	##do
	##	docker pull hyperledger/fabric-$IMAGE:$IMAGE_TAG
	##	docker tag hyperledger/fabric-$IMAGE:$IMAGE_TAG hyperledger/fabric-$IMAGE:latest 
	##done

	docker pull hyperledger/fabric-peer
	docker pull hyperledger/fabric-orderer
	docker pull hyperledger/fabric-ca
	docker pull hyperledger/fabric-ccenv
	docker pull hyperledger/fabric-couchdb
	docker pull hyperledger/fabric-kafka
	docker pull hyperledger/fabric-zookeeper
	docker pull hyperledger/fabric-javaenv
	docker pull hyperledger/fabric-tools
	docker pull mongo
	docker pull postgres
}




function startAllRequiredDckrImages(){
	printf "\n ===========STARTING All the required Docker Images===============\n"
	#Launch the network
	docker-compose -f ./docker-compose.yaml -f ./docker-compose-couch.yaml -f ./docker-compose-mongo.yaml up -d
}

function installNodeModules(){	
	## 1. Remove, if any node_modules installed now
	cd ..
	rm -rf ./node_modules

	## 2. Install Node Modules
	printf "\n================Install Node Modules=================\n"
	npm install
}

## Tearing the complete Network
function teardownNetwork(){

	## 1. Bring Down all the containers
	docker-compose -f ./docker-compose.yaml -f ./docker-compose-couch.yaml -f ./docker-compose-mongo.yaml down
	##docker ps -qa | xargs docker rm

	## 2. Remove All teh containers & Docker Images
	delDckrImages
}


## BootStraping the complete Network
function bootstrap(){
	## 1. Pull All the required Docker Images for BlockChain Project from Docker Hub
	pullAllRequiredDckrImages

	## 2. Start All the required Docker Images
	startAllRequiredDckrImages	

	## 3. Install all the Node Modules
	installNodeModules
}





## Network launch modes
## up (or Start), down (or stop) , restart
case $1 in
'start' | 'up')
	bootstrap
	;;
'stop' | 'down')
	teardownNetwork
	;;
'restart')
	teardownNetwork
	bootstrap
	;;
*)
	usage
	;;
esac