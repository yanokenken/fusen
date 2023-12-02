
import { getFusens } from "./getFusens";
const putFusen =  (fusen) => {
	// todo 最終的にはAPI化する
	return getFusens().then((fusens) => {
		const index = fusens.findIndex((f) => f.id === fusen.id);
		fusens[index] = fusen;
		return fusen;
	});
};
export default putFusen;