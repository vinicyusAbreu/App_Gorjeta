(function() {
    'use strict';

    const billInput = document.getElementById('bill-input');
    const peopleInput = document.getElementById('people-input');
    const tipInput = document.getElementById('tip-input');
    const btn = document.querySelectorAll('.btn');
    const reset = document.getElementById('reset');

    const totalHTML = document.querySelector('.total')
    const tipHTML = document.querySelector('.tip')


    let valorTip;

    const erroBill = document.querySelector('.erroBill');
    const erroPeople = document.querySelector('.erroPeople');


    billInput.addEventListener('focusout', bill)
    peopleInput.addEventListener('focusout', bill)
    tipInput.addEventListener('focusout', bill)

    btn.forEach(element => {

        element.addEventListener('click', bill)

    })

    reset.addEventListener('click', resetApp);


    function catchValueBill(valor) {
        if (Number(valor) > 0) {
            erroBillEvent();
            return true
        }
        billInput.classList.add('alert');
        erroBill.style.display = 'block';
    }

    function catchValuePeople(valor) {

        if (Number(valor) > 0) {
            erroPeopleEvent();

            return true
        }
        peopleInput.classList.add('alert');
        erroPeople.style.display = 'block';
    }


    function catchValueTip(valor) {

        if (Number(valor) > 0) {

            return true
        }


    }


    function bill(e) {


        if (e.target.classList.contains('btn')) {

            clearBtn();
            e.target.classList.add('select');

            const select = document.querySelector('.select')

            valorTip = select.getAttribute('data-value');

            tipInput.value = '';
        }


        if (catchValueBill(billInput.value) &
            catchValuePeople(peopleInput.value) &
            (valorTip != undefined || catchValueTip(tipInput.value))) {

            if (tipInput.value) {
                clearBtn();
                valorTip = undefined;
                calculeTip(billInput.value, tipInput.value, peopleInput.value);

                return
            }


            calculeTip(billInput.value, valorTip, peopleInput.value);
        }

    }


    function clearBtn() {
        btn.forEach(element => element.classList.contains('select') ? element.classList.remove('select') : '')
    }


    function calculeTip(total, tip, people) {

        let tipAmount = ((+total * +tip) / 100) / +people;
        let totalToPay = (+total / +people) + tipAmount;

        tipHTML.innerHTML = `$${tipAmount.toFixed(2)}`;
        totalHTML.innerHTML = `$${totalToPay.toFixed(2)}`;

    }


    function resetApp() {
        clearBtn();

        billInput.value = '';
        peopleInput.value = '';
        tipInput.value = '';

        tipHTML.innerHTML = `$0.00`;
        totalHTML.innerHTML = `$0.00`;

        erroBillEvent();
        erroPeopleEvent();
        valorTip = undefined;



    }


    function erroBillEvent() {
        if (billInput.classList.contains('alert')) {
            billInput.classList.remove('alert');
            erroBill.style.display = 'none';
        }
    }

    function erroPeopleEvent() {
        if (peopleInput.classList.contains('alert')) {
            peopleInput.classList.remove('alert');
            erroPeople.style.display = 'none';
        }
    }

})();