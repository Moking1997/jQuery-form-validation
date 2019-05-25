$(function() {
    'use static';

    window.Input = function(selector) {
    var $ele,
        $error_ele,
        me = this,
        rule = {
            required: true
        }

    this.load_validator = function() {
        var val = this.get_val()
        this.validator = new Validator(val, rule)
    }

    this.get_val = function() {
        return $ele.val()
    }

    function init() {
        find_ele()
        get_error_ele()
        parse_rule()
        me.load_validator()
        listen();
    }


    function listen() {
        $ele.on('blur', function() {
            var valid = me.validator.is_valid(me.get_val())
            if(valid)
                $error_ele.hide()
            else
                $error_ele.show()
        })
    }


    function get_error_ele() {
        $error_ele = $(get_error_selector())
    }

    function get_error_selector() {
        return '#' + $ele.attr('name') + '-input-error'
    }

    function find_ele() {
        /* 判断是否已经是选择器对象*/
        if(selector instanceof jQuery) {
            $ele = selector
        }else {
            $ele = $(selector)
        }
    }

    function parse_rule(){
        /* 获得data-rule里的数据并转为对象 */
        var rule_str = $ele.data('rule')
        if(!rule_str) return

        var rule_arr = rule_str.split('|') // ['min:18', 'maxlength:10']
        for(var i = 0; i < rule_arr.length; i++){
            var itme_str = rule_arr[i]
            var itme_arr = itme_str.split(":")  // ['min', 18]
            rule[itme_arr[0]] = JSON.parse(itme_arr[1]) //{min: 18}
        }
    }
    init();
    }
})
