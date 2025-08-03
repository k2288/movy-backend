import { DataSource } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

export class PersonSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const personRepository = this.dataSource.getRepository(Person);

    const people = [
      {
        name: 'علی رضایی',
        alsoKnownAs: 'علی رضایی',
        birthday: new Date('1985-03-15'),
        placeOfBirth: 'تهران، ایران',
        profilePath: '/images/people/ali-rezaei.jpg',
        biography: 'علی رضایی یکی از بهترین بازیگران سینمای ایران است که در بیش از ۵۰ فیلم بازی کرده است.',
        gender: 1,
        popularity: 8.5,
        status: 'Active'
      },
      {
        name: 'فاطمه محمدی',
        alsoKnownAs: 'فاطمه محمدی',
        birthday: new Date('1990-07-22'),
        placeOfBirth: 'اصفهان، ایران',
        profilePath: '/images/people/fateme-mohammadi.jpg',
        biography: 'فاطمه محمدی بازیگر جوان و با استعداد سینمای ایران است.',
        gender: 2,
        popularity: 7.8,
        status: 'Active'
      },
      {
        name: 'حسین احمدی',
        alsoKnownAs: 'حسین احمدی',
        birthday: new Date('1978-11-08'),
        placeOfBirth: 'شیراز، ایران',
        profilePath: '/images/people/hossein-ahmadi.jpg',
        biography: 'حسین احمدی کارگردان و بازیگر مشهور سینمای ایران است.',
        gender: 1,
        popularity: 9.2,
        status: 'Active'
      },
      {
        name: 'مریم کریمی',
        alsoKnownAs: 'مریم کریمی',
        birthday: new Date('1988-04-12'),
        placeOfBirth: 'تبریز، ایران',
        profilePath: '/images/people/maryam-karimi.jpg',
        biography: 'مریم کریمی یکی از محبوب‌ترین بازیگران زن سینمای ایران است.',
        gender: 2,
        popularity: 8.9,
        status: 'Active'
      },
      {
        name: 'رضا نوری',
        alsoKnownAs: 'رضا نوری',
        birthday: new Date('1982-09-30'),
        placeOfBirth: 'مشهد، ایران',
        profilePath: '/images/people/reza-nouri.jpg',
        biography: 'رضا نوری بازیگر و کارگردان با تجربه سینمای ایران است.',
        gender: 1,
        popularity: 8.1,
        status: 'Active'
      },
      {
        name: 'سارا احمدی',
        alsoKnownAs: 'سارا احمدی',
        birthday: new Date('1992-01-18'),
        placeOfBirth: 'یزد، ایران',
        profilePath: '/images/people/sara-ahmadi.jpg',
        biography: 'سارا احمدی بازیگر جوان و با استعداد سینمای ایران است.',
        gender: 2,
        popularity: 7.5,
        status: 'Active'
      },
      {
        name: 'امیر حسینی',
        alsoKnownAs: 'امیر حسینی',
        birthday: new Date('1980-06-25'),
        placeOfBirth: 'قم، ایران',
        profilePath: '/images/people/amir-hosseini.jpg',
        biography: 'امیر حسینی یکی از بهترین کارگردانان سینمای ایران است.',
        gender: 1,
        popularity: 9.0,
        status: 'Active'
      },
      {
        name: 'نازنین فرهادی',
        alsoKnownAs: 'نازنین فرهادی',
        birthday: new Date('1987-12-03'),
        placeOfBirth: 'کرج، ایران',
        profilePath: '/images/people/nazanin-farahani.jpg',
        biography: 'نازنین فرهادی بازیگر و تهیه‌کننده سینمای ایران است.',
        gender: 2,
        popularity: 8.3,
        status: 'Active'
      },
      {
        name: 'محمد رضایی',
        alsoKnownAs: 'محمد رضایی',
        birthday: new Date('1975-08-14'),
        placeOfBirth: 'اهواز، ایران',
        profilePath: '/images/people/mohammad-rezaei.jpg',
        biography: 'محمد رضایی بازیگر و کارگردان با تجربه سینمای ایران است.',
        gender: 1,
        popularity: 8.7,
        status: 'Active'
      },
      {
        name: 'الهام رضوی',
        alsoKnownAs: 'الهام رضوی',
        birthday: new Date('1995-05-20'),
        placeOfBirth: 'کرمانشاه، ایران',
        profilePath: '/images/people/elham-razavi.jpg',
        biography: 'الهام رضوی بازیگر جوان و با استعداد سینمای ایران است.',
        gender: 2,
        popularity: 7.2,
        status: 'Active'
      }
    ];

    for (const personData of people) {
      const existingPerson = await personRepository.findOne({ where: { name: personData.name } });
      if (!existingPerson) {
        const person = personRepository.create(personData);
        await personRepository.save(person);
      }
    }
  }
} 