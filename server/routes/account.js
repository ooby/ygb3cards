const ldap = require('ldapjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { error } = require('../libs/error');

const secret = config.get('config:secret');
const ad = config.get('config:ldap');

const createToken = name => {
    let paylaod = { name: name };
    return jwt.sign({ name: name }, secretKey, { expiresIn: '24h' });
};

const login = (req, res, next) => {
    let cli = ldap.createClient({ url: 'ldap://' + ad.server + ':389', reconnect: true });
    let uPn = req.body.name;
    let uPs = req.body.password;

    if (!uPn || !uPs) { res.status(403).json({ message: 'Необходимы логин и пароль' }); }
    else {
        cli.bind(uPn + '@' + ad.domain, uPs, e => {
            if (e) { next(error(500, e.message)); }
            let filterString = '(&(objectCategory=person)(objectClass=user)(sAMAccountName=' + uPn + '))';
            let opts = {
                filter: filterString,
                scope: 'sub',
                attributes: ['dn', 'sn', 'cn']
            };
            cli.search('DC=' + ad.dc1 + ',DC=' + ad.dc2, opts, (e, r) => {
                r.on('searchEntry', entry => {
                    let token = createToken(uPn);
                    res.status(200).json({
                        message: 'Успешный вход',
                        data: {
                            cn: entry.object.cn,
                            name: uPn,
                            token: token
                        }
                    });
                });
                r.on('error', e => {
                    next(error(500, 'Ошибка данных каталога'));
                });
            });
        });
        cli.on('error', e => {
            console.warn('LDAP connection failed, trying to reconnect', e);
        });
    }
};

const account = express => {
    const acc = express.Router();
    acc.post('/login', login);
    return acc;
};

module.exports = account;
