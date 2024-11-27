import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const logOutFunc = async () => {
    const route = useRouter();
    try {
        await signOut(auth);
        toast.success("LogOut Successfully");
        route.push("/signup");
    } catch (e) {
        console.log(e);
        toast.error("dubara kro")
    }
}