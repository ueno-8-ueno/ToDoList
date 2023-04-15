//Todoアプリの全体管理
export interface MyData{
	appName: string;
	todos: Todo;
	done: boolean;
	edit: number;
	title: string;
}

//Todoの雛形
export interface Todo{
	id: number;
	done: boolean;
	title: string;
}