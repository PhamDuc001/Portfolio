function validator(options) {
    var formElement = document.querySelector(options.form)
    var selectorRules = {}
    var validate = function(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorMessage)
        var errorMessage
        var rules = selectorRules[rule.selector]
        console.log(rules)
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage
    }
    if (formElement) {
        formElement.onsubmit = function(e) {
            var isFormValid = true
            e.preventDefault();
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })
            if (isFormValid) {
                if (typeof options.onsubmit === 'function') {
                    options.onsubmit({
                        name: 'Phạm Đức'
                    })
                }
            }
        }
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            if (inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }
                inputElement.oninput = function() {
                    inputElement.parentElement.querySelector('.errorMessage').innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }

}

validator.isRequire = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim(' ') ? undefined : message || "Vui lòng nhập trường này"
        }
    }
}
validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                // return value.trim(' ') ? null : "Vui lòng nhập trường này"
            return regex.test(value) ? undefined : message || "Trường này phải là email"
        }
    }
}
validator.isMinLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Mật khẩu phải nhiều hơn ${min} kí tự`
        }
    }
}
validator.isConfirm = function(selector, getConfirm, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirm() ? undefined : message || `Mật khẩu không trùng khớp`
        }
    }
}