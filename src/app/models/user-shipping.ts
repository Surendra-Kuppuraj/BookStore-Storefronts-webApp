import { Address } from './address';

export class UserShipping {
	public id: number;
	public address:Address = new Address();
	public userShippingDefault: boolean;
}
