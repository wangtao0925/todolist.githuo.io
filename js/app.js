angular.module('myApp',[])

	.controller('demoCtrl',['$scope','$http',function($scope,$http){

		/*
			1.获取数据并展示到页面中


		*/
	
		$scope.taskList = [];
		
		$http({
			method:'get',
			url:'./js/data.json'
		}).then(function(res){

			for(var i=0;i<res.data.length;i++){

				res.data[i].isEdit = false;

			}

			$scope.taskList = res.data;

			console.log(res);

		})

		/*
			2.添加任务

				1.获取任务名称
				2.敲击回车的时候 触发表单的默认行为 (submit提交事件)
				3.将获取到的任务追加到任务列表中
			
		*/

		$scope.addTask = function(){

			console.log($scope.task)

			if($scope.task){

				$scope.taskList.push({
					id:Math.random(),
					name:$scope.task,
					isCompleted : false
				})

				$scope.task = '';

				$scope.alterStatus();

			}else{

				alert('请输入任务名称');

			}
		
		}

		/*
			3.删除单个任务

				1.给删除按钮添加点击事件
				2.在点击事件的处理函数中将当前这条数据的ID传入
				3.在任务列表数组中查找当前这条数据
				4.删除

		 */
		
		$scope.deleteTask = function(id){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].id == id){

					$scope.taskList.splice(i,1);

				}

			}

		}


		/*
			4.更改任务状态

				1.将每一个任务名称中的checkbox和数据中isCompleted做绑定(ng-model)
				2.根据isCompleted的值来决定是否添加已完成类名

		 */
		

		/*
			5.记录有多少任务没有完成

				1.循环数据 找出isCompleted值为false的选项
				2.将计数变量加1

				插值表达式的第五个作用 可以调用函数

				要显示在页面中的数据 需要在函数中返回

			注意
				1.会报一个length错误

				需要在上面先声明tasklist为一个空数据 因为ajax异步的原因
				当$scope下面的属性的值发生改变的时候 angular会重新渲染模板 达到数据双向绑定的目的
		*/
	
		$scope.calcNumber = function(){

			var count = 0;

			for(var i=0;i<$scope.taskList.length;i++){

				if(!$scope.taskList[i].isCompleted){

					count++;

				}

			}

			return count;

		}


		/*
		
			6.实现任务的过滤功能
				
				1.给筛选功能添加点击事件
				2.点击对应的筛选按钮 更改对应的过滤条件


		 */
		
		$scope.condition = '';

		$scope.filterData = function(type){

			switch(type){

				case 'All':

					$scope.condition = '';

					break;

				case 'Active':

					$scope.condition = false;

					break;

				case 'Completed':

					$scope.condition = true;

					break;

			}

		}


		/*
		
			7.清除已完成任务

				1.给清除按钮添加点击事件
				2.在任务列表中找出已完成的数据 
				3.删除

		*/
	
		/*['吃饭','睡觉','打豆豆']

			0      1       2

		['睡觉','打豆豆']

			0       1*/
		
		$scope.clearAlready = function(){

			for(var i=0;i<$scope.taskList.length;i++){

				if($scope.taskList[i].isCompleted){

					$scope.taskList.splice(i,1);

					i--;

				}

			}

		}



		/*
		
			8.批量更改任务状态

				1.给全选按钮绑定数据
				2.根据按钮的绑定数据来决定任务列表的状态

		 */


		 $scope.changeStatus = function(){

		 	for(var i=0;i<$scope.taskList.length;i++){

		 		$scope.taskList[i].isCompleted = $scope.status;

		 	}

		 }

		 /*
		 	循环数据 看所有的任务是否都是选中的

		  */


		 $scope.alterStatus = function(){

		 	$scope.status = true;

		 	for(var i=0;i<$scope.taskList.length;i++){

		 		if(!$scope.taskList[i].isCompleted){

		 			$scope.status = false;

		 		}

		 	}

		 }


		 /*
		 
			9.更改任务名称

				1.给label添加双击事件
				2.在事件处理函数中将ID传入
				3.根据ID找到当前点击的数据
				4.给当前数据添加editing类名

		  */


		 $scope.modifyName = function(id){

		 	for(var i=0;i<$scope.taskList.length;i++){

		 		if($scope.taskList[i].id == id){

		 			$scope.taskList[i].isEdit = true;

		 		}else{

		 			$scope.taskList[i].isEdit = false;

		 		}

		 	}

		 }

		 $scope.leaveInp = function(){

		 	for(var i=0;i<$scope.taskList.length;i++){

		 		$scope.taskList[i].isEdit = false;

		 	}

		 }
		


	}])