import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from "@/components/blocks/date-picker";
import { Link } from "react-router";

const insuranceOptions = [
    { id: 1, label: 'Pojazd', image: 'https://img.icons8.com/?size=100&id=12666&format=png' },
    { id: 2, label: 'Mieszkanie', image: 'https://img.icons8.com/?size=100&id=73&format=png' },
    { id: 3, label: 'Podróż', image: 'https://img.icons8.com/?size=100&id=648&format=png' },
    { id: 4, label: 'Zdrowie życie', image: 'https://img.icons8.com/?size=100&id=35583&format=png' },
    { id: 5, label: 'Biznes', image: 'https://img.icons8.com/?size=100&id=7Yl8hX5gHFhC&format=png' },
    { id: 6, label: 'Rolne', image: 'https://img.icons8.com/?size=100&id=794&format=png' }
];

export const PolicyBuilder = () => {
    const [startDate, setStartDate] = useState();
    const [postCode, setPostCode] = useState('');
    const [postCodeError, setPostCodeError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [showFields, setShowFields] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleOptionChange = (id) => {
        setSelectedOptions((prev) =>
            prev.includes(id) ? prev.filter((option) => option !== id) : [...prev, id]
        );
    };

    const handleCompare = () => {
        setShowFields(true);
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold text-center">Znajdź najlepszą ofertę</h1>
            {!showFields && (
                <div className="flex items-center space-x-4 p-4 justify-between">
                    <label htmlFor="start-date" className="font-medium text-gray-800 w-50 md:w-auto">
                        Od kiedy potrzebujesz ubezpieczenia?
                    </label>
                    <DatePicker
                        date={startDate || new Date()}
                        setDate={(data) => { setStartDate(data) }}
                    />
                </div>
            )}
            {!showFields && (
                <Input
                    type="text"
                    value={postCode}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPostCode(value);
                        const postalCodePattern = /^[0-9]{2}-[0-9]{3}$/;

                        if (!postalCodePattern.test(value)) {
                            setPostCodeError('Please enter a valid postal code (e.g., 12-345)');
                        } else {
                            setPostCodeError('');
                        }
                    }}
                    placeholder="Podaj kod pocztowy"
                />
            )}
            {!showFields && postCodeError && <span className="text-red-500 text-sm">{postCodeError}</span>}

            {!showFields && (
                <div className="grid grid-cols-3 gap-4">
                    {insuranceOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`cursor-pointer p-4 text-center rounded-2xl shadow-md border-2 ${selectedOptions.includes(option.id) ? 'border-blue-500' : 'border-gray-300'
                                }`}
                            onClick={() => handleOptionChange(option.id)}>
                            <picture>
                                <img src={`${option.image}&color=FF0000}`} alt={option.label} className="mx-auto mb-2" />
                            </picture>
                            <div>{option.label}</div>
                        </div>
                    ))}
                </div>
            )}
            <div className="p-4">
                {showFields && (
                    <div className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium text-gray-800">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="block font-medium text-gray-800">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <Button asChild className="w-full bg-blue-500 text-white py-2 rounded-2xl">
                            <Link to={`/polisy`}>
                                Wyślij do agenta
                            </Link>
                        </Button>
                    </div>
                )}

                {!showFields && (<Button className="w-full bg-blue-500 text-white py-2 rounded-2xl" onClick={handleCompare}>
                    Porównaj oferty
                </Button>)}



            </div>
        </div >
    );
}
