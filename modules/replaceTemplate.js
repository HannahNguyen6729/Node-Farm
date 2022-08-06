module.exports = (template, item)=>{
    let card = template.replace(/{%productName%}/g, item.productName)
    card = card.replace(/{%img%}/g, item.image)
    card = card.replace(/{%quantity%}/g, item.quantity)
    card = card.replace(/{%price%}/g, item.price)
    card = card.replace(/{%ID%}/g, item.id)
    card = card.replace(/{%from%}/g, item.from)
    card = card.replace(/{%nutrients%}/g, item.nutrients)
    card = card.replace(/{%description%}/g, item.description)
    if(item.organic){
        card = card.replace(/{%isOrganic%}/g, 'ORGANIC')
    }else{
        card = card.replace(/{%isOrganic%}/g, 'NON-OC')
    }
    return card;
}