import axios from 'axios'
import Menu from 'primevue/menu'
import Badge from 'primevue/badge'
import ripple from 'primevue/ripple'

export default {
    components: {
        Menu,
        Badge,
    },
    directive: {
        ripple,
    },
    data() {
        return {
            items: [
                {
                    label: "Analytic",
                    icon: "pi pi-chart-bar",
                    to: "/admin"
                },
                {
                    label: "Members",
                    icon: "pi pi-users",
                    to: "/admin/members"
                },
                {
                    label: "Schedule",
                    icon: 'pi pi-calendar',
                    to: "/admin/schedule"
                },
                {
                    label: "Attendance",
                    icon: 'pi pi-list-check',
                    to: "/admin/attendance"
                }
            ]
        }
    },
    methods: {
    }
}