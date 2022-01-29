# Brew-web
Personal brew web application


my-app folder contains the tutorial:
https://coursetro.com/posts/code/174/Angular-8-Tutorial-&-Crash-Course

Angular-CLI-Fullstack
https://medium.com/@xavidramirez/angular-cli-fullstack-nodejs-express-mongoose-part-1-978ea0e3da4d

      this.networkSetting = new FormGroup({
        ipAddress: new FormControl(
          (this.isAvailable ? this.formSDR.ipConfig.addr: 'N/A'),
          Validators.compose([
            Validators.required,
            Validators.pattern('^(?!0)(?!.*\\.$)((1?\\d?\\d|25[0-5]|2[0-4]\\d)(\\.|$)){4}$')
          ])
        ),
        gateway: new FormControl(
          (this.isAvailable ?  this.formSDR.ipConfig.gateway : 'N/A'),
          Validators.compose([
            Validators.required,
            Validators.pattern('^(?!0)(?!.*\\.$)((1?\\d?\\d|25[0-5]|2[0-4]\\d)(\\.|$)){4}$')
          ])
        ),
        dns: new FormControl(
          (this.isAvailable? this.formSDR.ipConfig.dns: 'N/A'),
          Validators.compose([
            Validators.required,
            Validators.pattern('^(?!0)(?!.*\\.$)((1?\\d?\\d|25[0-5]|2[0-4]\\d)(\\.|$)){4}$')
          ])
        ),
        mask: new FormControl(
          (this.isAvailable ? this.formSDR.ipConfig.mask: 'N/A'),
          Validators.compose([
            Validators.required,
            Validators.pattern('[0-9]*$')
          ])
        )
      });
