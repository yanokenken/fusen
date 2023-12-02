
import { getFusens } from "./getFusens"
function postFusen(fusen) {
	// 最終的にはAPI化する
	return getFusens().then((fusens) => {
		fusen.id = fusens.length + 1;
		fusens.push(fusen);
		return fusen;
	});
}

export default postFusen;