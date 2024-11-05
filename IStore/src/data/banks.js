import Chase_Bank from '../images/Chase.jpg';
import HSBC from '../images/HSBC.png';
import ING from '../images/ING.jpg';
import Privat from '../images/Privat.jpg';
import Raiffeisen from '../images/raiffeisen.jpg';
import PUMB from '../images/PUMB.jpeg';
import Wells_Fargo from '../images/Wells_Fargo.jpeg';
import Barclays from '../images/Barclays.jpg';
import Citi from '../images/Citi.webp';

const banks = [
    {
        id: 1,
        imageSrc: Chase_Bank,
        imageAlt: 'Chase Bank',
        title: 'Chase Bank',
        description: 'A major U.S. bank offering personal and business banking services.',
        price: '$10m',
        type: 'Retail',
        interestRate: '4%',
        foundedYear: 2003,
    },
    {
        id: 2,
        imageSrc: HSBC,
        imageAlt: 'HSBC Bank',
        title: 'HSBC',
        description: 'A global bank headquartered in London, providing international banking services.',
        price: '$1.3b',
        type: 'Commercial',
        interestRate: '2.0%',
        foundedYear: 2006,
    },
    {
        id: 3,
        imageSrc: ING,
        imageAlt: 'ING Bank',
        title: 'ING',
        description: 'A Dutch multinational bank specializing in online banking services.',
        price: '$2.5m',
        type: 'Online',
        interestRate: '3.4%',
        foundedYear: 1991,
    },
    {
        id: 4,
        imageSrc: Privat,
        imageAlt: 'PrivatBank',
        title: 'PrivatBank',
        description: 'The largest bank in Ukraine, offering a range of personal and business banking services.',
        price: '$12.5m',
        type: 'Retail',
        interestRate: '0.6%',
        foundedYear: 1992,
    },
    {
        id: 5,
        imageSrc: Raiffeisen,
        imageAlt: 'Raiffeisen Bank Aval',
        title: 'Raiffeisen Bank Aval',
        description: 'A leading commercial bank in Ukraine, part of the international Raiffeisen Group.',
        price: '$9.1m',
        type: 'Commercial',
        interestRate: '1.8%',
        foundedYear: 1886,
    },
    {
        id: 6,
        imageSrc: PUMB,
        imageAlt: 'First Ukrainian International Bank',
        title: 'First Ukrainian International Bank (FUIB)',
        description: 'A large Ukrainian bank providing innovative financial services for retail and corporate clients.',
        price: '$6.9m',
        type: 'Retail',
        interestRate: '2.0%',
        foundedYear: 1991,
    },
    {
        id: 7,
        imageSrc: Wells_Fargo,
        imageAlt: 'Wells Fargo Bank',
        title: 'Wells Fargo',
        description: 'An American multinational financial services company with offerings in banking, mortgages, and investments.',
        price: '$15m',
        type: 'Retail',
        interestRate: '0.9%',
        foundedYear: 1852,
    },
    {
        id: 8,
        imageSrc: Barclays,
        imageAlt: 'Barclays Bank',
        title: 'Barclays',
        description: 'A major British bank with services in retail, wholesale, and investment banking across the globe.',
        price: '$11.2m',
        type: 'Investment',
        interestRate: '4%',
        foundedYear: 1690,
    },
    {
        id: 9,
        imageSrc: Citi,
        imageAlt: 'Citibank',
        title: 'Citibank',
        description: 'A large U.S. bank and subsidiary of Citigroup, known for its comprehensive financial services.',
        price: '$3.4b',
        type: 'Commercial',
        interestRate: '1.7%',
        foundedYear: 1812,
    },
];

export default banks;
