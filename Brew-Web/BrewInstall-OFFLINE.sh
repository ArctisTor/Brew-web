#!/bin/bash
node -v
#move to the project directory
cd ~
cd /opt/brew-web
#install Node libraries in project directory
#npm install --production
#move to the server directory
cd server
#move service file to /usr/lib/systemd/system
sudo cp ../BrewWebApp.service /usr/lib/systemd/system
#Forward traffic to port of the server
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8100
#Give permission
#chmod 755 -R /opt/brew-web
sudo chown tpcs:tpcs /opt/brew-web/server/config/appconfig.json
#enable the BrewWebApp service on start up
systemctl enable BrewWebApp
#install the iptables-service to be able to save the port forwarding rule
#save the rules
sudo service iptables save
#enable the iptables
systemctl enable iptables
#Set permission of the directory
sudo chown tpcs:tpcs -R /opt/brew
