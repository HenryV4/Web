import Chase_Bank from '../images/Chase.jpg';
import HSBC from '../images/HSBC.png';
import ING from '../images/ING.jpg';
import Privat from '../images/Privat.jpg';
import Raiffeisen from '../images/raiffeisen.jpg';
import PUMB from '../images/PUMB.jpeg';

const banks = [
    {
        imageSrc: Chase_Bank,
        imageAlt: 'Chase Bank',
        title: 'Chase Bank',
        description: 'A major U.S. bank offering personal and business banking services.',
        price: '$10m',
    },
    {
        imageSrc: HSBC,
        imageAlt: 'HSBC Bank',
        title: 'HSBC',
        description: 'A global bank headquartered in London, providing international banking services.',
        price: '$1.3b',
    },
    {
        imageSrc: ING,
        imageAlt: 'ING Bank',
        title: 'ING',
        description: 'A Dutch multinational bank specializing in online banking services.',
        price: '$2.5m',
    },
    {
        imageSrc: Privat,
        imageAlt: 'PrivatBank',
        title: 'PrivatBank',
        description: 'The largest bank in Ukraine, offering a range of personal and business banking services.',
        price: '$12.5m',
    },
    {
        imageSrc: Raiffeisen,
        imageAlt: 'Raiffeisen Bank Aval',
        title: 'Raiffeisen Bank Aval',
        description: 'A leading commercial bank in Ukraine, part of the international Raiffeisen Group.',
        price: '$9.1m',
    },
    {
        imageSrc: PUMB,
        imageAlt: 'First Ukrainian International Bank',
        title: 'First Ukrainian International Bank (FUIB)',
        description: 'A large Ukrainian bank providing innovative financial services for retail and corporate clients.',
        price: '$6.9m',
    },
];

export default banks;