import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddStudentForm from "../forms/AddStudentForm";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import UpdateProfileForm from "../forms/UpdateProfileForm";
import Homepage from "../homepage/Homepage";
import LessonDetails from "../lessons/LessonDetails";
import StudentDetails from "../students/StudentDetails";
import StudentList from "../students/StudentList";

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Homepage />
			</Route>
			<Route exact path="/students">
				<StudentList />
			</Route>
			<Route exact path="/students/add">
				<AddStudentForm />
			</Route>
			<Route path="/students/:studentId">
				<StudentDetails />
			</Route>
			<Route path="/lessons/:lessonId">
				<LessonDetails />
			</Route>
			<Route exact path="/login">
				<LoginForm />
			</Route>
			<Route exact path="/register">
				<RegisterForm />
			</Route>
			<Route exact path="/update">
				<UpdateProfileForm />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
