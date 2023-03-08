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
import PrivateRoute from "./PrivateRoute";

function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Homepage />
			</Route>
			<PrivateRoute exact path="/students">
				<StudentList />
			</PrivateRoute>
			<PrivateRoute exact path="/students/add">
				<AddStudentForm />
			</PrivateRoute>
			<PrivateRoute path="/students/:studentId">
				<StudentDetails />
			</PrivateRoute>
			<PrivateRoute path="/lessons/:lessonId">
				<LessonDetails />
			</PrivateRoute>
			<Route exact path="/login">
				<LoginForm />
			</Route>
			<Route exact path="/register">
				<RegisterForm />
			</Route>
			<PrivateRoute exact path="/update">
				<UpdateProfileForm />
			</PrivateRoute>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
