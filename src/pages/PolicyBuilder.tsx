import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from "@/components/blocks/date-picker";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BriefcaseBusinessIcon, CarIcon, HeartIcon, HomeIcon, LeafIcon, LoaderCircleIcon, LuggageIcon } from 'lucide-react';
import { cn, sleep } from '@/lib/utils';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export const formSchema = z.object({
    startDate: z.date(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    postCode: z.string().regex(/^[0-9]{2}-[0-9]{3}$/),
    insuranceOptions: z.array(z.number()),
})

const insuranceOptions = [
    { id: 1, label: 'Pojazd', icon: <CarIcon size={50} /> },
    { id: 2, label: 'Mieszkanie', icon: <HomeIcon size={50} /> },
    { id: 3, label: 'Podróż', icon: <LuggageIcon size={50} /> },
    { id: 4, label: 'Zdrowie życie', icon: <HeartIcon size={50} /> },
    { id: 5, label: 'Biznes', icon: <BriefcaseBusinessIcon size={50} /> },
    { id: 6, label: 'Rolne', icon: <LeafIcon size={50} /> }
];

export const PolicyBuilder = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: new Date(),
            name: '',
            email: '',
            phone: '',
            postCode: '',
            insuranceOptions: [],
        },
    })

    const [showSecondStep, setShowSecondStep] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const selectedOptions = form.getValues('insuranceOptions');

    const handleOptionChange = (id: number) => {
        if (selectedOptions.includes(id)) {
            form.setValue('insuranceOptions', selectedOptions.filter(option => option !== id));
        } else {
            form.setValue('insuranceOptions', [...selectedOptions, id]);
        }
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        setIsSending(true);
        await sleep(1000);
        navigate('/');
    }

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">
                Znajdź najlepszą ofertę
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {!showSecondStep && (
                        <>
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>
                                            Od kiedy potrzebujesz ubezpieczenia?
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value ? new Date(field.value) : new Date()}
                                                setDate={(date) => field.onChange(date)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="postCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kod pocztowy</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12-345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-3 gap-4">
                                {insuranceOptions.map(({ id, label, icon }) => {
                                    const isSelected = selectedOptions.includes(id);

                                    return (
                                        <button
                                            key={id}
                                            className={cn('cursor-pointer p-4 flex flex-col items-center rounded-2xl hover:shadow-md border-2', {
                                                'border-foreground': isSelected,
                                                'border-muted': !isSelected,
                                            })}
                                            onClick={() => handleOptionChange(id)}
                                        >
                                            {icon}
                                            <div className="font-bold">{label}</div>
                                        </button>
                                    );
                                })}
                            </div>

                            <Button className="w-56" type="button" onClick={() => setShowSecondStep(true)}>
                                Porównaj oferty
                            </Button>
                        </>
                    )}

                    {showSecondStep && (
                        <>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imię i nazwisko</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12-345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefon</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123-456-789" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="flex items-center gap-2"
                                type="submit"
                                disabled={isSending}
                            >
                                {isSending && <LoaderCircleIcon className="w-4 h-4 animate-spin" />}
                                Wyślij do agenta
                            </Button>
                        </>
                    )}
                </form>
            </Form>
        </div >
    );
}
