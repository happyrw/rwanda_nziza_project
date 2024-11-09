"use server";
import { District } from "../models/district";
import { EconomicActivity } from "../models/economiActivity";
import { Verification } from "../models/emailVerification";
import { Event } from "../models/event";
import { Province } from "../models/province";
import { User } from "../models/user";
import { connectDB } from "../mongoose";

// Province
export const fetchProvinces = async () => {
    await connectDB();
    try {
        const province = await Province.find();
        return province;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const fetchProvinceById = async (id: string) => {
    await connectDB();
    try {
        const dataToUpdate = JSON.parse(JSON.stringify(await Province.findById(id)));
        return dataToUpdate;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Districts
export const fetchDistricts = async () => {
    await connectDB();

    try {
        const districts = await District.find();
        return districts;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const fetchDistrictById = async (id: string) => {
    await connectDB();
    try {
        const dataToUpdate = JSON.parse(JSON.stringify(await District.findById(id)));
        return dataToUpdate;
    } catch (error) {
        console.log(error);
        return [];
    }
};
// Economic Activities
export const fetchEconomicActivities = async () => {
    await connectDB();
    try {
        const economicActivities = await EconomicActivity.find();
        return economicActivities;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const fetchEconomicActivityById = async (id: string) => {
    await connectDB();
    try {
        const dataToUpdate = JSON.parse(JSON.stringify(await EconomicActivity.findById(id)));
        return dataToUpdate;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Events
export const fetchEvents = async () => {
    await connectDB();
    try {
        const events = await Event.find();
        return events;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const fetchEventById = async (id: string) => {
    await connectDB();
    try {
        const dataToUpdate = JSON.parse(JSON.stringify(await Event.findById(id)));
        return dataToUpdate;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Verification token
export const fetchVerificationTokenByToken = async (token: string) => {
    await connectDB();
    try {
        const verificationToken = await Verification.findOne({ token });
        return verificationToken;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchVerificationTokenByEmail = async (email: string) => {
    await connectDB();
    try {
        const verificationToken = await Verification.findOne({ email });
        return verificationToken;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// User
export const fetchUserByEmail = async (email: string) => {
    await connectDB();

    try {
        const user = JSON.parse(JSON.stringify(await User.findOne({ email })));
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}
