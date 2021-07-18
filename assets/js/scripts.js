window.newsletterList = new NewsletterStorage();

window.onload = function()
{
    let form = document.querySelector("#newsletterForm");

    if(form)
    {
        form.addEventListener('submit', function(ev){
            ev.preventDefault();

            let nameEl = document.querySelector("#newsletterName");
            let emailEl = document.querySelector("#newsletterEmail");

            if(!nameEl.value || !emailEl.value)
            {
                window.alert('Você precisa informar seu nome e seu e-mail!!');
                return;
            }

            window.newsletterList.addMail(emailEl.value, nameEl.value);
            nameEl.value = '';
            emailEl.value = '';
            window.alert('Obrigada por se inscrever em nossa newsletter!!');
        });
    }
}


