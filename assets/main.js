var menuElement = document.querySelector('.header-menu')
var closeElement = document.querySelector('.close__infor-icon')

clickMenu = function() {

    document.querySelector('.portfolio-infor').classList.add('portfolio-infot__active')
}
closeInfor = function() {
    document.querySelector('.portfolio-infor').classList.remove('portfolio-infot__active')

}