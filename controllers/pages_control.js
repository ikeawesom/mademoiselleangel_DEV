exports.home_control = (req,res) => {
    res.render('index');
}

exports.cart_control = (req,res) => {
    res.render('cart');
}

exports.products_control = (req,res) => {
    res.render('products');
}

exports.maintenance_control = (req,res) => {
    res.render('maintenance');
}

exports.success_control = (req,res) => {
    res.render('success')
}

exports.paynow_control = (req,res) => {
    res.render('paynow')
}
