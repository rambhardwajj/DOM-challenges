/**
 * Write your challenge solution here
 */


const button = document.querySelectorAll('.accordion-button')

console.log(button)

button.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        const accordionItem = btn.parentElement;
        console.log(accordionItem)
        const arrow = btn.querySelector('.arrow');
            
        const isActive = accordionItem.classList.contains('active')
        
        const allItems = document.querySelectorAll('.accordion-item').forEach((item)=>{
            item.classList.remove('active')
        })

        if( !isActive){
            accordionItem.classList.add('active');
        }

    })
})

