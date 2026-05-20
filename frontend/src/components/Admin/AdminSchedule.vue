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
            <Form v-slot="$form" :resolver="resolver" :initial-values="create_item_form" @submit="create_schedule_item">
                <div>
                    <label>Name</label>
                    <InputText name="name" autocomplete="off" :invalid="!!$form.name?.invalid" />
                    <small v-if="$form.name?.invalid">{{  $form.name.error?.message }}</small>
                </div>
                <div>
                    <label>Day</label>
                    <Select name="day" :options="day_options" optionLabel="name" optionValue="name"  fluid :invalid="!!$form.day?.invalid"></Select>
                    <small v-if="$form.day?.invalid">{{  $form.day.error?.message }}</small>
                </div>
                <div>
                    <label>Start Time</label>
                    <DatePicker name="start_time" id="datepicker-timeonly" timeOnly fluid :invalid="!!$form.start_time?.invalid" />
                    <small v-if="$form.start_time?.invalid">{{  $form.start_time.error?.message }}</small>
                </div>
                <div>
                    <label>End Time</label>
                    <DatePicker name="end_time" id="datepicker-timeonly" timeOnly fluid :invalid="!!$form.end_time?.invalid" />
                    <small v-if="$form.end_time?.invalid">{{  $form.end_time.error?.message }}</small>
                </div>
                <div>
                    <label>Max Attendance</label>
                    <InputNumber name="max_attendance" mode="decimal" showButtons :min="1" :invalid="!!$form.max_attendance?.invalid"></InputNumber>
                    <small v-if="$form.max_attendance?.invalid">{{  $form.max_attendance.error?.message }}</small>
                </div>
                <div class="button-section">
                    <Button type="button" label="Cancel" @click="hide_create_dialog"></Button>
                    <Button type="submit" label="Create"></Button>
                </div>
            </Form>
        </div>
 
    </Dialog>


</template> 

<script src="@/scripts/Admin/AdminSchedule.js" />