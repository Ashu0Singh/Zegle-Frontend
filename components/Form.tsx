"use client";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GeistMono } from "geist/font/mono";

interface LoginData {
    userName: String;
    email: String;
    password: String;
}

const UserForm = ({
    children,
    FormTitle,
    className,
}: {
    children: ReactNode;
    FormTitle: String;
    className?: string;
}) => {
    return (
        <Card className={`form ${className}`}>
            <CardHeader className="form-header">
                <CardTitle
                    className={`${GeistMono.className} form-header-title`}
                >
                    {FormTitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="form-content">{children}</CardContent>
        </Card>
    );
};

export default UserForm;