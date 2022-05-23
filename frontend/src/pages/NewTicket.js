import { useSelector } from "react-redux";
import { useState } from "react";

function NewTicket() {
	const { user } = useSelector((state) => state.auth);
	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState("");
	const [description, setDescription] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className='heading'>
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className='form'>
				<div className='form-group'>
					<label htmlFor='name'>
						<input type='text' className='form-control' value={name} disabled />
					</label>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>
						<input
							type='text'
							className='form-control'
							value={email}
							disabled
						/>
					</label>
				</div>
				<form onSubmit={onsubmit}>
					<div className='form-group'>
						<label htmlFor='product'>Product</label>
						<select
							name='product'
							id='prduct'
							value={product}
							onChange={(e) => setProduct(e.target.value)}
						>
							<option value='iPhone'>iPhone</option>
							<option value='MacBook Pro'>MacBook Pro</option>
							<option value='iMac'>iMac</option>
							<option value='iPad'>iPad</option>
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='description'>Describe your issue</label>
						<textarea
							name='description'
							id='description'
							className='form-control'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default NewTicket;
