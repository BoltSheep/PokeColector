const bcrypt = require('bcrypt');

const main = () =>
{
    const password = 'Teste@123*';
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt);

    console.log("Password", password);
    console.log("Hash", hash);
    console.log("Salt", salt);
}

const main2 = () =>
{
    const password = 'Teste@123*';
    const hash = '$2b$10$MpcVb/kpK2tFF215LYYvPOj.iKProZTFqW8Heut/hDVgLx6CIE032';

    console.log(bcrypt.compareSync(password, hash));
    console.log(bcrypt.compareSync(password + '0', hash));
}

main();
main2();
