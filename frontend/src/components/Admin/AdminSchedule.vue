<template> 
    <h1>Schedule</h1>
    <div v-for="day in days" style="width: 25rem">
        <Card style="width: 25rem">
            <template #title>{{ day.string }}
            </template>
            <template #content>
                <div v-for="item in day.items" style="width:15rem">
                    <Card style="width: 15rem">
                        <template #title>{{ item.name }}</template>
                        <template #content>Start Time: {{ item.start_time }} End Time: {{ item.end_time }} Attendance: {{ item.max_attendance }}</template>
                        <template #footer>
                            <Button>
                                <i class="pi pi-minus"></i>
                            </Button>
                            <Button>
                                <i class="pi pi-pencil"></i>
                            </Button>
                        </template>
                    </Card>
                </div>
            </template>
            <template #footer>
                <Button @click="show_create_dialog">
                    <i class="pi pi-plus"></i>
                </Button>
            </template>
        </Card>
    </div>
    <div style="width: 25rem">
        <Card style="width: 25rem">
            <template #title>Inactive</template>
        </Card>
    </div>

    <Dialog v-model:visible="display_create_dialog" model header="Create Schedule">
        <div>
            <Form v-slot="$form" @submut="create_schedule_item">
                <div>
                    <label for="schedule_name">Name</label>
                    <InputText v-model="create_item_form.name" id="schedule_name" autocomplete="off" />
                </div>
                <div>
                    <label>Day</label>
                    <Select v-model="create_item_form.day" :options="day_options" optionLabel="name" optionValue="name"  fluid></Select>
                </div>
                <div>
                    <label>Time</label>
                    <DatePicker v-model="create_item_form.time" id="datepicker-timeonly" timeOnly fluid />
                </div>
                <div>
                    <label>Max Attendance</label>
                    <InputNumber v-model="create_item_form.max_attendance" mode="decimal" showButtons :min="0"></InputNumber>
                </div>
                <div class="button-section">
                    <Button type="button" label="Cancel" @click="hide_create_dialog"></Button>
                    <Button type="submit" label="Create" @click="hide_create_dialog(); create_schedule_item()"></Button>
                </div>
            </Form>
        </div>
 
    </Dialog>


</template> 

<script src="@/scripts/Admin/AdminSchedule.js" />