
function validationForm(){
    var name=document.contact-form.name;
    var number=document.contact-form.number;
    if(name=='' || number==''){
    alert('fill the form');
    return false;
    }
}