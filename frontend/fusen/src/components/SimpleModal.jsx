
function SimpleModal({modalId, title, body, button}) {


	return (
		<>
		<dialog id={modalId} className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">{title}</h3>
				<pre className="py-4 whitespace-break-spaces">{body}</pre>
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