import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "features/notes/noteSlice";
import { BackButton } from "ui/BackButton";
import Spinner from "ui/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import NoteItem from "features/notes/NoteItem";

function Ticket() {
	const { ticket, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.tickets
	);

	const { notes, noteLoading } = useSelector((state) => state.notes);

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(id));
		dispatch(getNotes(id));
		// eslint-disable-next-line
	}, [isError, message, id]);

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(id));
		toast.success("Ticket Closed");
		navigate("/tickets");
	};

	if (isLoading || noteLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h3>Something went wrong</h3>;
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/tickets' />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3 className='medium'>
					Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
				</h3>
				<h3 className='medium'>Product: {ticket.product}</h3>
				<hr />
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<h3 className='medium'>Notes</h3>
			</header>

			{notes.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}

			{ticket.status !== "closed" && (
				<button onClick={onTicketClose} className='btn btn-block btn-danger'>
					Close Ticket
				</button>
			)}
		</div>
	);
}

export default Ticket;
