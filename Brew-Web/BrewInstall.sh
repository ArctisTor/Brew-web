#!/bin/bash
#Installation script for SDR Web Application
#download Node Version Manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
#install latest version of node
nvm install 12.17.0
node -v
#move to the project directory
cd ~
cd /opt/brew-web
#install Node libraries in project directory
#npm install --production
#move to the server directory
cd server
#install the Node libraries for server directory
npm install
#move service file to /usr/lib/systemd/system
sudo cp ../BrewWebApp.service /usr/lib/systemd/system
#remove unwanted port forwarding
sudo iptables -t nat -D PREROUTING 1
#Forward traffic to port of the server
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8100
#Give permission
#chmod 755 -R /opt/brew-web
sudo chown tpcs:tpcs /opt/brew-web/server/config/appconfig.json
#enable the BrewWebApp service on start up
systemctl enable BrewWebApp
#install the iptables-service to be able to save the port forwarding rule
sudo yum install iptables iptables-services
#save the rules
sudo service iptables save
#enable the iptables
systemctl enable iptables
#Set permission of the directory
sudo chown tpcs:tpcs -R /opt/brew-web
