
function SimpleModal({modalId, title, body, button}) {


	return (
		<>
		<dialog id={modalId} className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">{title}</h3>
				<p className="py-4">{body}</p>
				<div className="modal-action">
					<form method="dialog">
						<button className="btn">{button}</button>
					</form>
				</div>
			</div>
		</dialog>
		</>

	);
}

export default SimpleModal;