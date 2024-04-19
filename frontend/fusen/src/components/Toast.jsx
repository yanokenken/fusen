import React, {useEffect} from "react";
import { useRecoilState } from "recoil";
import { toastState } from "../state/atoms";


function Toast () {
	const [toast, setToast] = useRecoilState(toastState);

	

	useEffect(() => {
		if (toast.message) {
			setTimeout(() => {
				setToast({ message: '', type: 'info', time: 3000 });
			}, toast.time);
		}
	}, [toast.message, toast.time, setToast]);

	let toastClass = "";
	switch (toast.type) {
		case "error":
			toastClass = "alert alert-error";
			break;
		case "success":
			toastClass = "alert alert-success";
			break;
		case "info":
			toastClass = "alert alert-info";
			break;
		case "warning":
			toastClass = "alert alert-warning";
			break;
		default:
			toastClass = "alert";
			break;
	}

	if (!toast.message) {
		return null;
	}
	
	return (
		<div className="toast toast-top z-50">
			<div className={toastClass}>
				<span>{toast.message}</span>
			</div>
		</div>
	);
}

export default Toast;
