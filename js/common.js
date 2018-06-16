var ruler = (function(){
    var first = $('.ruller-equation_first'),
    second = $('.ruller-equation_second'),
    ruler = $('.ruler'),
    arrow = '<div class="ruler-arrow">\
                <input type="text" class="ruler-arrow_input" maxlength="1">\
                <div class="ruler-arrow_height"></div>\
            </div>',
    arrowItem = ruler.find('.ruler-arrow'),
    last = arrowItem.last(),
    prev = last.prev(),
    arrowCounter = 0;

    // Возвращает случайное число в промежутке
    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    // Получаем числа для дальнейшего сложения
    function getNumbers(){
        var numbers = $('.ruller-equation_item'),
            firstNumber = randomInteger(6,9)

        numbers.eq(0).html(firstNumber)
        numbers.eq(1).html(randomInteger(11,14) - firstNumber)

    }
    // Заменяем инпут на строку с правельным ответом
    function changeInput(str, item){
        var parent = null,
            val = null;
            console.log(str)
        if(str){
            parent = item.parent()
            val = item.val()
            parent.append('<p class="ruler-arrow_number">'+ val +'</p>')
            item.remove()   
        }else {
            parent = item.parent()
            val = item.val()
            parent.append(val)
            item.remove()   
        }

    }

    // обновляем переменные

    function getVars(){
        arrowItem = ruler.find('.ruler-arrow');  
        last = arrowItem.last(),
        prev = last.prev();   
    }

    // Считаем длину стрелки

    function getWidth(){
        var width = +$('.ruller-equation_item').eq(arrowCounter).text()
        arrowCounter++
        return width
    }

    // Получаем позицию стрелки

    function getLeft(){

        if(prev.length){
            var counter = 0
            for (i = 0; i < arrowItem.length; i++ ){
                counter += arrowItem.eq(i).width()
            }
            return counter
        }
        return 0

    }

    // Проверка итогового ответа

    function checkAnswer(){
        
        var sum = 0,
        itm = $('.ruller-equation_item');
    
        for (i = 0; i < itm.length; i++){
            sum += +itm.eq(i).text()
        }
        $('.ruller-equation_result_input').on('input', function(){
            
            if (+$(this).val() == sum){
                changeInput(false, $(this))
            }
        })
    }

    
    return {

        //Инициализация линейки

        init: function(){
            getNumbers()
            this.appendArrow()
        }, // Вставляем стрелку
        appendArrow: function(){
            var leftPos = getLeft()
            ruler.append(arrow)
            getVars()
            arrowItem.last().css({
                "width": 39 * getWidth(),
                "left": 37 + leftPos
            })
            this.watchInput()
        }, // Прослушка input над стрелкой
        watchInput: function(){
            var that = this,
                tragetItem = $('.ruller-equation_item').eq(arrowCounter - 1)

            $('.ruler-arrow_input').on('input', function(){

                if (+$(this).val() == +tragetItem.text()){
                    if(arrowCounter == 2){
                        tragetItem.removeClass('orange')
                        changeInput(true, $(this))
                        $('.ruller-equation_result').html('<input class="ruller-equation_result_input" maxlength="2">')
                        checkAnswer()
                        
                    } else {
                        tragetItem.removeClass('orange')
                        changeInput(true, $(this))
                        that.appendArrow()
                    }                    
                } else{                    
                    tragetItem.addClass('orange')
                }
            })
        }
    }
})()

if($('.ruler').length){
    ruler.init()
}