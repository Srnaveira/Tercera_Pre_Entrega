async function renderLogin (req, res) {
    try {
        res.status(200).render('login');
    } catch (error) {
        console.error("Problemas renderizando login")
        res.statu(404).json({message: "Problemas renderizando login"})
    }
}

async function renderRegister (req, res) {
    try {
        res.status(200).render('register');
    } catch (error) {
        console.error("Problemas renderizando register")
        res.statu(404).json({message: "Problemas renderizando register"})
    }
}

async function renderProfile (req, res) {
    try {
        res.status(200).render('current', { user: req.session.user });;
    } catch (error) {
        console.error("Problemas renderizando register")
        res.statu(404).json({message: "Problemas renderizando register"})
    }
}

async function renderUser (req, res) {
    try {
        res.status(200).json(req.session.user || null);
    } catch (error) {
        console.error("Problemas renderizando user")
        res.statu(404).json({message: "Problemas renderizando user"})
    }
}

module.exports = {
    renderLogin,
    renderProfile,
    renderRegister,
    renderUser
}