<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type{ MyData, Todo } from "../interfaces"

let todos: Todo[] = ref([]);
let todosLength: number = todos.value.length; //Todoの格納されている数

const myData: MyData = reactive({
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

function changeTodo(id:number){ //各Todoの完了・未了の状態を反転
    todos.value.forEach(todo => {if(todo.id == id) todo.done = !todo.done;});
    toggle();
    toggle();
}

function deleteTodo(id:number){ //Todoの削除
    todos.value = todos.value.filter( t => (t.id != id));
    toggle();
    toggle();
}

function editTodo(id:number){ //編集中のidを変更
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
	const todo: Todo = {
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
	<v-layout>
		<div class="container">
			<div class="p-3 text-center">
				<h1>{{ myData.appName }}</h1>
				<p v-if="myData.done">完了リスト</p><p v-else>未了リスト</p>
				<p><v-btn @click="toggle">完了/未了</v-btn></p>
			</div>
			<div>
				<v-table>
					<thead>
						<tr>
							<th width="85%">内容</th>
							<th>追加</th>
						</tr>
					</thead>
						<tr>
							<td>
								<v-text-field 
								    v-model="myData.title" 
									hide-details="auto"
								></v-text-field>
							</td>
							<td><v-btn @click="addTodo" color="info">追加</v-btn></td>
						</tr>
				</v-table>
			</div>
			<div>
				<v-table>
					<thead>
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
						<td v-else>
							<v-text-field 
							    v-model="todo.title"
								hide-details="auto"
							></v-text-field>
						</td>
						<td><v-btn @click="changeTodo(todo.id)" color="primary">変更</v-btn></td>
						<td><v-btn @click="deleteTodo(todo.id)" color="danger">削除</v-btn></td>
						<td><v-btn @click="editTodo(todo.id)" color="secondary">編集</v-btn></td>
						<td v-if="todo.id==myData.edit"><v-btn @click="resetEdit" color="green">解除</v-btn></td>
					</tr>
				</v-table>
			</div>
		</div>
	</v-layout>
</template>