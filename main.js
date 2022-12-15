gui = {}
user_record = []
comp_record = []
preview = false
win_code = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
console.log(gui.user1)


function cheek_win(rec){
    for(x in win_code){
        filter = win_code[x].filter((item) => !rec.includes(item))
        console.log(filter.length)
        if(filter.length == 0){return true}

    }
    return false;
}

function next_best_move(){
    data = []
    block = null
    for(x in win_code){
        //extract used cell from win
        filter = win_code[x].filter((item) => !user_record.includes(item))
        //check if computer can win
        if(filter.length == 3){
            filter = win_code[x].filter((item) => !comp_record.includes(item))
            if(filter.length == 1){console.log(111);return filter[0]}
            //end check
            data.push(filter)
        }
        // check if user can win
        else if(filter.length == 1){if(!comp_record.includes(filter[0])){block = filter[0]}}
        //end check
    }
    //if computer can't win and user can
     if(block){console.log(112); return block}
    //get first shortest array
    smallest = data.reduce(function(p,c) {return p.length>c.length?c:p;},{length:Infinity})
    //extract all similar arrays
    data = data.filter((item) => item.length == smallest.length)
    //get one random array e.g [1,2,3]
    // if no next best move
    if (data.length == 0){
        $('.over h4').html("It's a tie")
        $('.over').css('display', '')
        $('#'+comp).removeClass('active').unbind('click')
    return
    }
    console.log(data)
    rand1 = data[Math.floor(Math.random() * data.length)]
    //get one random value from rand1 array e.g 2
    console.log(rand1)
    rand2 = rand1[Math.floor(Math.random() * rand1.length)]
    console.log(113);
    return rand2
}

function Input(){
    id = parseInt($(this).attr('id'))
    console.log(id)
    user_record.push(parseInt(id))
    $(this).removeClass('active').unbind('click')
    $(this).html(`<img src="${gui.user1}">`)
    if(!cheek_win(user_record)){
        comp = next_best_move()
        comp_record.push(comp)
        $('#'+comp).html(`<img src="${gui.user2}">`)
        $('#'+comp).removeClass('active').unbind('click')
        console.log(comp)
        if(cheek_win(comp_record)){
            $('.over h4').html('oops you lose')
            $('.over').css('display', '')
            $('.active').removeClass('active').unbind('click')
        }
    }else{
        $('.over h4').html('wow you won')
        $('.over').css('display', '')
        $('.active').removeClass('active').unbind('click')
    }
}

function Reset(){
    $('.col').html('').addClass('active')
    $('.col').bind('click', Input)
    user_record=[];comp_record=[]
}

$(document).ready(function(){
    $('.active').on('click', Input)

    $('.ox input').on('click', function(){
        if ($(this).val() == "X"){
            gui.user1 = 'x.png'; gui.user2 = 'o.png'
        }else{
            gui.user1 = 'o.png'; gui.user2 = 'x.png'
            comp = next_best_move()
            comp_record.push(comp)
            $('#'+comp).html(`<img src="${gui.user2}">`)
            $('#'+comp).removeClass('active').unbind('click')
            console.log(comp)
        }
        $('.form').css('display', 'none');
    })

    $('.over input').click(function(){
        $('.over').css('display', 'none');
        if ($(this).val() == "Restart"){
            Reset()
        }else if($(this).val() == "Menu"){
            Reset(); $('.form').css('display', '');
        }else{
            $('.container').on('click', function(){
                $(this).unbind('click')
                $('.over').css('display', '');
            })
        }

    })
})