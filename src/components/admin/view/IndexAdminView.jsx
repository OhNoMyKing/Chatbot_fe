import Background from "../../common/Background";

import { imageBackground } from "../../common/data";
import Left from "../../common/left";
import Menu from "../../common/menu";
import UserService from "../../service/UserService";
import ModuleDashBoardAdmin from "../module/ModuleDashboardAdmin";



function IndexAdminView() {
    const adminOnly = UserService.adminOnly();
    if (adminOnly) {
        return (
            <div>
                <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                    data-sidebar-position="fixed" data-header-position="fixed">
                    <Menu />
                    <Background imageBackground={imageBackground} />
                    <div className="" style={{ display: 'flex' }}>
                        <Left />
                        <div className="body-wrapper" style={{ marginLeft: '0px', flexGrow: 1 }} ></div>
                        <ModuleDashBoardAdmin />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                    data-sidebar-position="fixed" data-header-position="fixed">
                    YOU ARE GAY
                </div>
            </div>
        )
    }

}
export default IndexAdminView;