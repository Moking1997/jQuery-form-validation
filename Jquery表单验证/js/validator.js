$(function() {
    'use static';

    window.Validator = function(val, rule){

        this.is_valid = function(new_val) {
            var key
            if(new_val !== undefined)
                val = new_val

            /* 判断是否合法 */
            if(!rule.required && !val)
                return true

            for (key in rule) {
                /* 防止重复选择*/
                if(key === 'required')
                    continue
                /* 调用相对于的方法 */
                var r = this['validate_' + key]()
                if(!r) return false
            }
            return true
        }

        this.validate_max = function(){
            pre_max_min()
            return  val <= rule.max
        }

        this.validate_min = function(){
            pre_max_min()
            return  val >= rule.min
        }

        this.validate_maxlength = function(){
            pre_length()
            return  val.length <= rule.maxlength
        }

        this.validate_minlength = function(){
            pre_length()
            return  val.length >= rule.minlength
        }

        this.validate_numeric = function(){
            return  $.isNumeric(val)
        }

        this.validate_required = function(){
            /* 除去空格输入 */
            var real = $.trim(val)
            if(!real && real !== 0) {
                return false
            }
            return  true
        }

        this.validate_pattern = function(){
            /* 通过字符串生成正则对象 */
            var reg = new RegExp(rule.pattern)
            return  reg.test(val)
        }

        /*用于完成验证的前置工作*/
        function pre_max_min() {
            val = parseFloat(val)
        }

        function pre_length() {
            val =val.toString()
        }
    }
})
