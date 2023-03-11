<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

let todos =ref([]);
let todosLength = todos.value.length; //Todoの格納されている数

const myData = reactive({
	appName: "TODO Application",
	todos: todos.value, // TODOリスト
	done: false,  // 選択中のフラグ
    edit: 0 ,     // 編集中のid
	title: ""     // 追加する項目
});

function toggle(){ //完了・未了のリスト表示を切り替え
    myData.done = !myData.done;
}

const getTodos = computed(() => { //完了・未了の状態からTodoを抽出
    const result = todos.value.filter( t => (myData.done == t.done));
	return result;
});

function changeTodo(id){ //各Todoの完了・未了の状態を反転
    todos.value.forEach(todo => {if(todo.id == id) todo.done = !todo.done;});
    toggle();
    toggle();
}

function deleteTodo(id){ //Todoの削除
    todos.value = todos.value.filter( t => (t.id != id));
    toggle();
    toggle();
}

function editTodo(id){ //編集中のidを変更
    myData.edit = id;
}
function resetEdit(){ //編集モードリセット
    myData.edit = 0;
}

function addTodo(){ //Todoを追加する
	if(myData.title.length <= 0){
		myData.title = "-";
	}
	myData.done = false;
	const todo = {
		id: ++todosLength,
		done: false,
		title: myData.title
	}
	todos.value.push(todo);
	toggle();
	toggle();
	myData.title = "";
}
</script>

<template>
    <div class="container">
		<div class="p-3 text-center">
			<h1>{{ myData.appName }}</h1>
		    <p v-if="myData.done">完了リスト</p><p v-else>未了リスト</p>
		    <p><button @click="toggle" class="btn btn-primary">完了/未了</button></p>
		</div>
		<div class="mb-3">
			<table class="table">
				<thead class="table-ligth">
					<tr>
						<th width="85%">内容</th>
						<th>追加</th>
					</tr>
				</thead>
					<tr>
						<td><input v-model="myData.title" class="form-control"/></td>
						<td><button @click="addTodo" class="btn btn-primary">追加</button></td>
					</tr>
			</table>
		</div>
		<div class="mb-3">
			<table class="table tablestriped table-hover">
				<thead class="table-light">
					<tr>
						<th width="10%">番号</th>
						<th width="10%">状態</th>
						<th width="50%">内容</th>
						<th>変更</th>
						<th>削除</th>
						<th>編集</th>
					</tr>
				</thead>
				<tr v-for="todo in getTodos" key="todo.id">
					<td>{{ todo.id }}</td>
					<td v-if="todo.done">完了</td><td v-else>未了</td>
					<td v-if="todo.id!=myData.edit">{{ todo.title }}</td>
					<td v-else><input v-model="todo.title"/></td>
					<td><button @click="changeTodo(todo.id)" class="btn btn-primary">変更</button></td>
					<td><button @click="deleteTodo(todo.id)" class="btn btn-danger">削除</button></td>
					<td><button @click="editTodo(todo.id)" class="btn btn-secondary">編集</button></td>
					<td v-if="todo.id==myData.edit"><button @click="resetEdit" >解除</button></td>
				</tr>
			</table>
		</div>
	</div>
  
</template>