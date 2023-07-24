import { createStore }  from 'vuex'
import loginux          from './modules/ux/login'
import loginapi         from './modules/api/login'
import loadingux        from './modules/ux/loading'
import asideux          from './modules/ux/aside'
import presensiapi      from './modules/api/presensi'
import scoreapi         from './modules/api/score'
import adminapi         from './modules/api/admin'
import teacherapi       from './modules/api/teacher'
import kelasapi         from './modules/api/kelas'
import siswaapi         from './modules/api/siswa'
import studentdetailapi from './modules/api/studentdetail'
import parentapi        from './modules/api/parent'
import formAddEditStudentParentUx  from './modules/ux/formAddEditStudentParent'
import formAddEditStudentParentApi from './modules/api/formAddEditStudentParent'
import formAddStudentExcelUx       from './modules/ux/formAddStudentExcel'
import formAddStudentExcelApi      from './modules/api/formAddStudentExcel'
import formAddEditAdminTeacherUx   from './modules/ux/formAddEditAdminTeacher'
import formAddEditAdminTeacherApi  from './modules/api/formAddEditAdminTeacher'
import formAddEditKelasSubkelasUx  from './modules/ux/formAddEditKelasSubkelas'
import formAddEditKelasSubkelasApi from './modules/api/formAddEditKelasSubkelas'
import formDateRangeUx from './modules/ux/formDateRange'
import settingux       from './modules/ux/setting'
import settingapi      from './modules/api/setting'

export default createStore({
  state: {
    apiurl : "https://sholat.up.railway.app",
    // apiurl : "http://127.0.0.1:8000",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginux,loginapi,
    loadingux,
    asideux,
    presensiapi,
    scoreapi,
    adminapi,
    teacherapi,
    kelasapi,
    siswaapi,
    studentdetailapi,
    parentapi,
    formAddEditStudentParentUx,formAddEditStudentParentApi,
    formAddStudentExcelUx,formAddStudentExcelApi,
    formAddEditAdminTeacherUx,formAddEditAdminTeacherApi,
    formAddEditKelasSubkelasUx,formAddEditKelasSubkelasApi,
    formDateRangeUx,
    settingux,settingapi,
  }
})
