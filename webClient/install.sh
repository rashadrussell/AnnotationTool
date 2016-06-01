#!/bin/bash

#this file installs all required software on our VM
red='\033[0;31m'
NC='\033[0m' # No Color

echo "${red}Updating apt-get ...${NC}"
sudo apt-get update
echo "${red}Installing Git ...${NC}"
sudo apt-get install -y git
echo "${red}Installing other utilities ...${NC}"
sudo apt-get install build-essential -y
sudo apt-get install python libssl-dev -y
sudo apt-get install python-software-properties -y
sudo apt-add-repository -y ppa:chris-lea/node.js
sudo apt-get -y update
sudo apt-get -y install curl git-core 

#install node
sudo apt-get update
sudo apt-get install nodejs

echo "${red}Installing Bower ...${NC}"
npm install -g bower
npm install -g bower-installer
echo "${red}Installing Grunt ...${NC}"
sudo npm install -g grunt-cli


#install and run MONGO
#from http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
echo "${red}Installing MongoDB ...${NC}"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org

#update your ruby using rbenvs 
echo "${red}Updating Ruby using rbenvs ...${NC}"
curl https://raw.githubusercontent.com/fesplugas/rbenv-installer/master/bin/rbenv-installer | bash
sudo echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
sudo echo 'eval "$(rbenv init -)"' >> ~/.bashrc
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
rbenv bootstrap-ubuntu-12-04
#http://tarashish.com/blog/2013/02/02/fixing-mkmf-load-error-ubuntu/
sudo apt-get install ruby1.9.1-dev -y
rbenv install 2.1.0
rbenv global 2.1.0
rbenv rehash
sudo echo "gem: --no-ri --no-rdoc" > ~/.gemrc
ruby -v

#install tools globally for front-end development
echo "${red}Installing Front End Development Tools ...${NC}"
gem update --system
echo "${red}Installing Susy ...${NC}"
sudo gem install susy

echo "${red}Installation Process Complete. You should do \"source ~/.profile\" before you proceed any further ${NC}."




