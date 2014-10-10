/*  Author Details
  ==============
  Author: Ranjith Pandi

  Author URL: http://ranjithpandi.com

  Attribution is must on every page, where this work is used.

  For Attribution removal request. please consider contacting us through http://ranjithpandi.com/#contact
*/

;(function ($) {
  if (typeof Object.create !== 'function') {
      Object.create = function(obj) {
          function F(){}
          F.prototype = obj;
          return new F();
      };
  }

  var Password = {
    init: function(elem, options) {
      this.msg = "";
      this.strength = 0;
      this.$elem = $(elem);
      this.val = this.$elem.val();
      this.len = this.val.length;
      this.defaults = {
        blackList : [],
        minChars : "",
        maxChars : "",
        similarToUsername: true,
        lowerCase: true,
        upperCase: true,
        hasNumber: true,
        specialChars: '!,@,#,$,%,\^,&,*,?,_,~',
        hasSpecialChar: true
      };
      this.color = {
        0: {color: '#DD514C', width: '10%'},
        1: {color: '#DD514C', width: '10%'},
        2: {color: '#FAA732', width: '35%'},
        3: {color: '#5EB95E', width: '70%'},
        4: {color: '#00FF80', width: '100%'}
      };

      this.options = $.extend(this.defaults, options);

      this.options.info.html('');
      if (this.val == "") {
        this.msg = 'Password is empty';
        this.showInfo();
        return false;
      }

      if (this.options.minChars != "" && this.defaults.minChars > this.len) {
        this.msg = 'Password should have ' + this.defaults.minChars + ' characters';
        this.showInfo();
        return false;
      }

      if (this.options.maxChars != "" && this.defaults.maxChars > this.len) {
        this.msg = 'Password should have ' + this.defaults.maxChars + ' characters';
        this.showInfo();
        return false;
      }

      if (this.options.lowerCase && !this.val.match(/[a-z]/)) {
        this.msg = 'Password should have lower case characters';
        this.showInfo();
        return false;
      }

      if (this.options.upperCase && !this.val.match(/[A-Z]/)) {
        this.msg = 'Password should have upper case characters';
        this.showInfo();
        return false;
      }

      if(this.options.hasNumber && !this.val.match(/\d+/)) {
        this.msg = 'Password should have number';
        this.showInfo();
        return false;
      }

      if (this.options.hasSpecialChar){
        var regex = new RegExp(".[" + this.options.specialChars + "]","gi");
        if(!this.val.match(regex)) {
          this.msg = 'Password should have special characters';
          this.showInfo();
          return false;
        }
      }

      if(this.options.similarToUsername){
        var userName = this.options.userName.val();
        this.options.blackList.push(userName);
      }
      this.meter = zxcvbn(this.val, this.options.blackList);
      switch(this.meter.score) {
        case 0:
        case 1:
            this.msg = 'Password Strength : Very Weak';
            this.showInfo();
            break;
        case 2:
            this.msg = 'Password Strength : Weak';
            this.showInfo();
            break;
        case 3:
            this.msg = 'Password Strength : Medium';
            this.showInfo();
            break;
        case 4:
            this.msg = 'Password Strength : Strong';
            this.showInfo();
            break;
      }
    },

    showInfo: function(){
      this.options.info.html(this.msg);
      var info = this.color[1];
      if(this.meter){
        info = this.color[this.meter.score];
      }
      this.options.passwordmeter.css({'background-color': info.color, 'width': info.width});
    }
  }

  $.fn.PasswordStrength = function(options) {
    var password = Object.create(Password);
    password.init(this, options);
  };

})(jQuery);