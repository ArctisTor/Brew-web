Name:       SDR-Web-App
Version:    3.0
Release:    1
Summary:    This will build the rpm for SDR Web Application
License:    TODO


%description


%prep
#install Node libraries in project directory
cd ~
cd Brew-web/Brew-Web/
npm install
#Install Angular-Cli
npm install -g @angular/cli
#Run the ng build command
cd ~
cd Brew-web/Brew-Web/
sudo rm -rf brew-web-application
ng build --configuration=production
#Move to the server directory
cd server
#install the Node libraries for server directory
npm install

%build

%install
%define brewPath ''
echo "Brew Path= %{brewPath}"
echo "Buildroot = %{buildroot}"
mkdir %{buildroot}/opt
mkdir %{buildroot}/opt/brew-web
cp -R %{brewPath}/server %{buildroot}/opt/brew-web
cp -R %{brewPath}/brew-web-application %{buildroot}/opt/brew-web
cp -R %{brewPath}/package.json %{buildroot}/opt/brew-web
cp -R %{brewPath}/brewWebApp.spec %{buildroot}/opt/brew-web
cp -R %{brewPath}/BrewInstall.sh %{buildroot}/opt/brew-web
cp -R %{brewPath}/BrewInstall-OFFLINE.sh %{buildroot}/opt/brew-web
cp -R %{brewPath}/BrewWebApp.service %{buildroot}/opt/brew-web
cp -R %{brewPath}/RPM-README.md %{buildroot}/opt/brew-web

%files
%attr(0755, root, root) /opt/sdr-web-app

%post
################################################################################
# This one runs after the installation of files.                               #
# This section can be pretty much anything you need or want it to be,          #
# including creating files, running system commands, and                       #
# restarting services to reinitialize them after making configuration changes  #
################################################################################


%clean
sudo rm -rf %{buildroot}/opt/sdr-web-app

%changelog
# let's skip this for now
