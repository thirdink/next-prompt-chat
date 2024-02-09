'use client'
import { protectedComponent } from '@/service/client/auth-service';
function Page() {
	return <div>Profile</div>;
}

export default protectedComponent(Page);
