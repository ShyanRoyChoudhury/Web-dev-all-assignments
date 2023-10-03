import { atom } from "recoil"

export interface Course {
    _id: string,
    imageLink: string,
    price: number,
    description: string,
    title: string
}

export const courseState = atom<{isLoading: boolean, course: null | Course}>({
    key: 'courseState',
    default:{
        isLoading: true,
        course: null
    }
})