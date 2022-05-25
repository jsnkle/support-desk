import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "features/tickets/ticketSlice";
import Spinner from "ui/Spinner";
import { BackButton } from "ui/BackButton";

function NewTicket() {
	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.tickets
	);
	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			dispatch(reset());
			navigate("/tickets");
		}

		dispatch(reset());
	}, [dispatch, isError, isSuccess, navigate, message]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTicket({ product, description }));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BackButton url='/' />
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
				<form onSubmit={onSubmit}>
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
