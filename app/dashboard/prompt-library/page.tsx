import { protectedComponent } from '@/service/client/auth-service';
function Page() {
    return (
        <div>prompt-library</div>
    )
}

export default protectedComponent(Page);